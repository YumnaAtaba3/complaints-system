// import { useTranslation } from "react-i18next";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/shared/components/ui/card";
// import { FileText, Clock, RefreshCw, CheckCircle } from "lucide-react";

// const Dashboard = () => {
//   const { t } = useTranslation();

//   const stats = [
//     {
//       title: t("allComplaints"),
//       value: "1,234",
//       icon: FileText,
//       color: "text-blue-500",
//       bgColor: "bg-blue-500/10",
//     },
//     {
//       title: t("pending"),
//       value: "156",
//       icon: Clock,
//       color: "text-amber-500",
//       bgColor: "bg-amber-500/10",
//     },
//     {
//       title: t("inProgress"),
//       value: "89",
//       icon: RefreshCw,
//       color: "text-purple-500",
//       bgColor: "bg-purple-500/10",
//     },
//     {
//       title: t("resolved"),
//       value: "989",
//       icon: CheckCircle,
//       color: "text-green-500",
//       bgColor: "bg-green-500/10",
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       {/* Welcome Section */}
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">
//           {t("overview")}
//         </h1>
//         <p className="text-muted-foreground">{t("governmentSystem")}</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => (
//           <Card key={stat.title} className="border-border">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-foreground">
//                 {stat.title}
//               </CardTitle>
//               <div className={`p-2 rounded-lg ${stat.bgColor}`}>
//                 <stat.icon className={`h-5 w-5 ${stat.color}`} />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-foreground">
//                 {stat.value}
//               </div>
//               <p className="text-xs text-muted-foreground mt-1">
//                 +12% from last month
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Recent Activity */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-xl">Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
//               >
//                 <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
//                   <FileText className="h-5 w-5 text-gold" />
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-medium text-foreground">
//                     New complaint submitted
//                   </h4>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     Complaint #CMD-{1000 + item} has been submitted and awaiting
//                     review
//                   </p>
//                   <span className="text-xs text-muted-foreground mt-2 block">
//                     {item} hour{item > 1 ? "s" : ""} ago
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;
