import { MessageInput } from '@/features/message-input/ui/MessageInput'
import { ClipBoard } from '@/shared/assets/icons/ClipBoard'
import { DescriptionUi } from '@/shared/ui/descriptionUi/DescriptionUi'
import { LinkTextUi } from '@/shared/ui/linkTextUi/LinkTextUi'
import { TextUi } from '@/shared/ui/textUi/TextUi'

export const App = () => {
  return (
    <div className='main'>
      <TextUi />
      <MessageInput />
      <div className='linkStyle'>
        <LinkTextUi />
        <ClipBoard />
      </div>
      <DescriptionUi />
      <hr />
    </div>
  )
}
