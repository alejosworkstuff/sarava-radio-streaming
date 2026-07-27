import { auth, currentUser } from "@clerk/nextjs/server";
import { CommentSection } from "./comment-section";
import {
  listCommentsForNovel,
  listCommentsForPost,
} from "@/app/actions/comments";
import { isAllowedAdminEmail } from "@/lib/admin-auth";

export async function Comments({
  postId,
  novelId,
}: {
  postId?: string;
  novelId?: string;
}) {
  if ((!postId && !novelId) || (postId && novelId)) {
    throw new Error("Comments requiere postId o novelId (uno solo).");
  }

  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const email = user?.emailAddresses[0]?.emailAddress;
  const canModerate = isAllowedAdminEmail(email);

  const initialComments = postId
    ? await listCommentsForPost(postId)
    : await listCommentsForNovel(novelId!);

  return (
    <CommentSection
      postId={postId}
      novelId={novelId}
      initialComments={initialComments}
      currentUserId={userId}
      canModerate={canModerate}
    />
  );
}
