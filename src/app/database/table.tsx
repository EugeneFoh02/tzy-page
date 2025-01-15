"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Post = {
  id: number;
  fullName: string;
  shirtSize: string;
  nameOnShirt: string | null;
  contactNumber: string;
  paymentSlip: string | null;
  paymentMethod: "bank" | "tng" | "other";
  createdAt: Date; // Updated type
  registered: boolean;
};

type PostsTableProps = {
  posts: Post[];
};

export default function PostsTable({ posts }: PostsTableProps) {
  const router = useRouter();

  useEffect(() => {
    const storedRegSource = sessionStorage.getItem("secretToken");

    if (!storedRegSource) {
      router.push("/unauthorized");
    }
  }, [router]);

  // Logout function to clear session and redirect to homepage
  const handleLogout = () => {
    sessionStorage.removeItem("secretToken"); // Remove the token
    router.push("/"); // Redirect to homepage
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>Full Name</TableCell>
              <TableCell>Shirt Size</TableCell>
              <TableCell>Name On Shirt</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell className="text-right">Created At</TableCell>
              <TableCell className="text-right">Registration Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                
                <TableCell>{post.fullName}</TableCell>
                <TableCell>{post.shirtSize}</TableCell>
                <TableCell>{post.nameOnShirt || "N/A"}</TableCell>
                <TableCell>{post.contactNumber}</TableCell>
                <TableCell>{post.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {new Date(post.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`${
                      post.registered ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {post.registered ? "Registered" : "Not Registered"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
