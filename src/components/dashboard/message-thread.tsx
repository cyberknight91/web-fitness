"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type MessageData = {
  id: string;
  content: string;
  fromUserId: string;
  createdAt: string;
  fromUser: { name: string; role: string };
};

export function MessageThread({
  messages: initialMessages,
  currentUserId,
  otherUserId,
  otherUserName,
}: {
  messages: MessageData[];
  currentUserId: string;
  otherUserId: string;
  otherUserName: string;
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toUserId: otherUserId, content: newMessage.trim() }),
      });
      if (!res.ok) throw new Error();
      const msg = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: msg.id,
          content: msg.content,
          fromUserId: currentUserId,
          createdAt: msg.createdAt,
          fromUser: { name: "Tu", role: "CLIENT" },
        },
      ]);
      setNewMessage("");
      router.refresh();
    } catch {
      toast.error("Error al enviar mensaje");
    } finally {
      setSending(false);
    }
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="h-[400px] overflow-y-auto space-y-3 mb-4 p-2">
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Sin mensajes aun. Inicia una conversacion con {otherUserName}!
            </p>
          )}
          {messages.map((msg) => {
            const isMe = msg.fromUserId === currentUserId;
            return (
              <div
                key={msg.id}
                className={cn("flex", isMe ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                    isMe
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p>{msg.content}</p>
                  <p className={cn(
                    "mt-1 text-xs",
                    isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {new Date(msg.createdAt).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        <div className="flex gap-2">
          <Textarea
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
            className="min-h-[40px] resize-none"
          />
          <Button onClick={handleSend} disabled={sending || !newMessage.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
