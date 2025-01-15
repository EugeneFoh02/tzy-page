import { prisma } from "@/lib/db";
import PostsTable from "./table";

export default async function PostsPage() {
  // Fetch data in the Server Component
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      fullName: true,
      shirtSize: true,
      nameOnShirt: true,
      contactNumber: true,
      paymentSlip: true,
      paymentMethod: true,
      createdAt: true,
      registered: true,
    },
  });

  // Pass data to a Client Component
  return <PostsTable posts={posts} />;
}
