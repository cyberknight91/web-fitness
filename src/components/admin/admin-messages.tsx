"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ClientInfo = {
  id: string;
  name: string;
  email: string;
  unreadCount: number;
};

type MessageData = {
  id: string;
  content: string;
  fromUserId: string;
  createdAt: string;
  fromUser: { name: string };
};

export function AdminMessages({
  clients,
  adminId,
}: {
  clients: ClientInfo[];
  adminId: string;
}) {
  const [selectedClient, setSelectedClient] = useState<ClientInfo | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadMessages(client: ClientInfo) {
    setSelectedClient(client);
    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/admin/messages?clientId=${client.id}`);
      const data = await res.json();
      setMessages(data);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  }

  async function handleSend() {
    if (!newMessage.trim() || !selectedClient) return;
    setSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toUserId: selectedClient.id, content: newMessage.trim() }),
      });
      if (!res.ok) throw new Error();
      const msg = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: msg.id,
          content: msg.content,
          fromUserId: adminId,
          createdAt: msg.createdAt,
          fromUser: { name: "You" },
        },
      ]);
      setNewMessage("");
    } catch {
      toast.error("Failed to send");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-3">
      {/* Client List */}
      <Card className="md:col-span-1">
        <CardContent className="p-2">
          <div className="space-y-1">
            {clients.map((client) => (
              <button
                key={client.id}
                onClick={() => loadMessages(client)}
                className={cn(
                  "w-full rounded-lg p-3 text-left transition-colors",
                  selectedClient?.id === client.id
                    ? "bg-primary/10"
                    : "hover:bg-muted/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{client.name}</span>
                  {client.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {client.unreadCount}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{client.email}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="md:col-span-2">
        <CardContent className="p-4">
          {!selectedClient ? (
            <div className="flex h-[400px] items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="mx-auto h-8 w-8 mb-2" />
                <p className="text-sm">Selecciona un cliente para enviar mensajes</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-3 border-b pb-2">
                <span className="font-semibold">{selectedClient.name}</span>
              </div>
              <div className="h-[350px] overflow-y-auto space-y-3 mb-4 p-2">
                {loadingMessages ? (
                  <p className="text-center text-muted-foreground py-8">Cargando...</p>
                ) : messages.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Sin mensajes aun.
                  </p>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.fromUserId === adminId;
                    return (
                      <div
                        key={msg.id}
                        className={cn("flex", isMe ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                            isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                          )}
                        >
                          <p>{msg.content}</p>
                          <p className={cn(
                            "mt-1 text-xs",
                            isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                          )}>
                            {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
