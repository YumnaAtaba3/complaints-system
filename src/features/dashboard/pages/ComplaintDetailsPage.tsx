// // src/complaints/ComplaintDetailsPage.tsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { type Complaint } from "";

// import { Button } from "@/shared/components/ui/button";

// const ComplaintDetailsPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [complaint, setComplaint] = useState<Complaint | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;
//     const loadComplaint = async () => {
//       try {
//         const data = await getComplaintById(id);
//         setComplaint(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadComplaint();
//   }, [id]);

//   if (loading) return <p>Loading complaint...</p>;
//   if (!complaint) return <p>Complaint not found.</p>;

//   return (
//     <div className="container py-6">
//       <Button
//         onClick={() => navigate(-1)}
//         className="mb-4 bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
//       >
//         Back
//       </Button>

//       <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
//         <h1 className="text-2xl font-semibold">{complaint.title}</h1>
//         <p className="text-gray-500">Reference: {complaint.referenceNumber}</p>
//         <p className="text-gray-500">
//           Submitted by: {complaint.userName} (ID: {complaint.userId})
//         </p>
//         <p className="text-gray-500">
//           Unit: {complaint.governmentUnit || "N/A"}
//         </p>
//         <p className="text-gray-500">Type: {complaint.type}</p>
//         <p className="text-gray-500">Status: {complaint.status}</p>
//         <p className="text-gray-700">{complaint.description}</p>

//         {/* Files */}
//         {complaint.files && complaint.files.length > 0 && (
//           <div className="mt-4">
//             <h3 className="font-semibold text-gray-800 mb-2">Files:</h3>
//             <ul className="space-y-2">
//               {complaint.files.map((file) => (
//                 <li key={file.id}>
//                   <a
//                     href={file.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline"
//                   >
//                     {file.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ComplaintDetailsPage;
