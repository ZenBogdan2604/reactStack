import { MessageInput } from "@/widgets/messageInput/MessageInput";
import { ClipBoardIcon } from "@/shared/assets/icons/ClipBoardIcon";
import { LinkTextUi } from "@/shared/ui/linkTextUi/LinkTextUi";
import { TextUi } from "@/shared/ui/textUi/TextUi";
import { TitleUi } from "@/shared/ui/titleUi/TitleUi";

export const HomePage = () => {
  return (
    <>
      <TitleUi>Welcome to Lobster!</TitleUi>
      <MessageInput />
      <div className="linkStyle">
        <LinkTextUi />
        <ClipBoardIcon />
      </div>
      <TextUi center>IMPORTANT TO READ!</TextUi>
      <hr />
    </>
  );
};
