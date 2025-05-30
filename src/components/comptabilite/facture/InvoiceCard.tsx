import { Invoice } from "./types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Receipt,
  Calendar,
  Building2,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/format";

interface InvoiceCardProps {
  invoice: Invoice;
  onClick?: () => void;
}

export function InvoiceCard({ invoice, onClick }: InvoiceCardProps) {
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "paid":
        return {
          label: "Payée",
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-500/5",
          borderColor: "border-green-500/20",
        };
      case "overdue":
        return {
          label: "En retard",
          icon: AlertTriangle,
          color: "text-red-500",
          bgColor: "bg-red-500/5",
          borderColor: "border-red-500/20",
        };
      case "sent":
        return {
          label: "Envoyée",
          icon: Clock,
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/5",
          borderColor: "border-yellow-500/20",
        };
      case "draft":
        return {
          label: "Brouillon",
          icon: FileText,
          color: "text-blue-500",
          bgColor: "bg-blue-500/5",
          borderColor: "border-blue-500/20",
        };
      case "cancelled":
        return {
          label: "Annulée",
          icon: XCircle,
          color: "text-gray-500",
          bgColor: "bg-gray-500/5",
          borderColor: "border-gray-500/20",
        };
      default:
        return {
          label: status,
          icon: Receipt,
          color: "text-gray-500",
          bgColor: "bg-gray-500/5",
          borderColor: "border-gray-500/20",
        };
    }
  };

  const statusDetails = getStatusDetails(invoice.status);
  const StatusIcon = statusDetails.icon;
  const daysUntilDue = Math.ceil(
    (new Date(invoice.due_date).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md cursor-pointer",
        statusDetails.bgColor,
        statusDetails.borderColor
      )}
      onClick={onClick}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            <h3 className="font-semibold">{invoice.invoice_number}</h3>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "flex items-center gap-1 font-medium",
              statusDetails.color,
              statusDetails.borderColor
            )}
          >
            <StatusIcon className="h-3 w-3" />
            {statusDetails.label}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {invoice.client.name}
          </Badge>
          {invoice.project_name && (
            <Badge variant="outline">{invoice.project_name}</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Montant total</p>
            <p className="font-semibold">
              {formatCurrency(invoice.total, invoice.currency)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date d'échéance</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(invoice.due_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {invoice.status === "sent" && daysUntilDue <= 7 && daysUntilDue > 0 && (
          <div className="pt-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Échéance dans {daysUntilDue} jour{daysUntilDue > 1 ? "s" : ""}
            </Badge>
          </div>
        )}

        {invoice.items.length > 0 && (
          <div className="pt-2 text-sm text-muted-foreground">
            {invoice.items.length} article{invoice.items.length > 1 ? "s" : ""}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
