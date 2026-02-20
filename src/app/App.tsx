import { LinkTextUi } from '@/shared/ui/linkTextUi/LinkTextUi'
import { TextAreaButtonUi } from '@/shared/ui/textAreaButtonUi/TextAreaButtonUi'
import { TextAreaUi } from '@/shared/ui/textAreaUi/TextAreaUi'
import { TextUi } from '@/shared/ui/textUi/TextUi'


export const App = () => {
  return (
    <div>
      <TextUi />
      <TextAreaUi />
      <TextAreaButtonUi />
      <LinkTextUi />
    </div>
  )
}
