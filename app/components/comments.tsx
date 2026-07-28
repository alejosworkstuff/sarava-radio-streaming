import { auth, currentUser } from "@clerk/nextjs/server";
import { CommentSection } from "./comment-section";
import {
  listCommentsForNovel,
  listCommentsForPage,
  listCommentsForPost,
} from "@/app/actions/comments";
import { isAllowedAdminEmail } from "@/lib/admin-auth";
import {
  isCommentPageKey,
  type CommentPageKey,
} from "@/lib/comment-pages";

export async function Comments({
  postId,
  novelId,
  pageKey,
}: {
  postId?: string;
  novelId?: string;
  pageKey?: CommentPageKey;
}) {
  const targets = [postId, novelId, pageKey].filter(Boolean);
  if (targets.length !== 1) {
    throw new Error(
      "Comments requiere postId, novelId o pageKey (uno solo).",
    );
  }
  if (pageKey && !isCommentPageKey(pageKey)) {
    throw new Error(`pageKey inválido: ${pageKey}`);
  }

  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const email = user?.emailAddresses[0]?.emailAddress;
  const canModerate = isAllowedAdminEmail(email);

  const initialComments = postId
    ? await listCommentsForPost(postId)
    : novelId
      ? await listCommentsForNovel(novelId)
      : await listCommentsForPage(pageKey!);

  return (
    <CommentSection
      postId={postId}
      novelId={novelId}
      pageKey={pageKey}
      initialComments={initialComments}
      currentUserId={userId}
      canModerate={canModerate}
    />
  );
}
