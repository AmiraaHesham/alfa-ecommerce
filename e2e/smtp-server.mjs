import http from "node:http";
import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";

const SMTP_PORT = Number(process.env.E2E_SMTP_PORT || 3025);
const API_PORT = Number(process.env.E2E_SMTP_API_PORT || 3026);
const messages = [];

const smtpServer = new SMTPServer({
  authOptional: true,
  allowInsecureAuth: true,
  disabledCommands: ["STARTTLS"],
  onAuth(auth, session, callback) {
    if (auth.username === "test@example.com" && auth.password === "test") {
      callback(null, { user: auth.username });
      return;
    }
    callback(new Error("Invalid SMTP credentials"));
  },
  onData(stream, session, callback) {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", async () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      try {
        const parsed = await simpleParser(raw);
        messages.push({
          from: session.envelope.mailFrom?.address || "",
          to: (session.envelope.rcptTo || []).map((item) => item.address),
          subject: parsed.subject || "",
          text: parsed.text || "",
          html: typeof parsed.html === "string" ? parsed.html : "",
          receivedAt: new Date().toISOString(),
        });
        callback();
      } catch (error) {
        callback(error);
      }
    });
  },
});

smtpServer.listen(SMTP_PORT, "127.0.0.1", () => {
  console.log(`[e2e-smtp] SMTP listening on ${SMTP_PORT}`);
});

smtpServer.on("error", (error) => {
  console.error("[e2e-smtp] SMTP error", error);
});

const apiServer = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", messages: messages.length }));
    return;
  }

  if (req.method === "DELETE" && req.url === "/messages") {
    messages.length = 0;
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/messages")) {
    const url = new URL(req.url, `http://127.0.0.1:${API_PORT}`);
    const to = url.searchParams.get("to")?.toLowerCase();
    const filtered = to
      ? messages.filter((message) =>
          message.to.some((address) => address.toLowerCase() === to),
        )
      : messages;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(filtered));
    return;
  }

  res.writeHead(404);
  res.end();
});

apiServer.listen(API_PORT, "127.0.0.1", () => {
  console.log(`[e2e-smtp] HTTP API listening on ${API_PORT}`);
});

apiServer.on("error", (error) => {
  console.error("[e2e-smtp] HTTP error", error);
});

function shutdown() {
  smtpServer.close();
  apiServer.close();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
