export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default async function ClientsPage() {
  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "desc" },
    include: {
      routines: { where: { active: true }, select: { id: true } },
      mealPlans: { where: { active: true }, select: { id: true } },
      _count: { select: { progressLogs: true } },
    },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Clientes</h1>
      <p className="mt-1 text-muted-foreground">{clients.length} clientes registrados</p>

      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Objetivo</TableHead>
                <TableHead>Rutina</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Registros</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="text-muted-foreground">{client.email}</TableCell>
                  <TableCell>
                    {client.goal ? (
                      <Badge variant="secondary" className="capitalize">{client.goal}</Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={client.routines.length > 0 ? "default" : "outline"}>
                      {client.routines.length > 0 ? "Activo" : "Ninguno"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={client.mealPlans.length > 0 ? "default" : "outline"}>
                      {client.mealPlans.length > 0 ? "Activo" : "Ninguno"}
                    </Badge>
                  </TableCell>
                  <TableCell>{client._count.progressLogs}</TableCell>
                  <TableCell>
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/clients/${client.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
