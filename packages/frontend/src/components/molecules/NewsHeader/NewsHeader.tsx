import { AddButton } from '@atoms';
import { Header, HeaderText } from './NewsHeader.style';
import { NewsPageType } from '@lib/types';

type HeaderProps = {
  pageType: NewsPageType;
  openModal: () => void;
};

const NewsHeader = ({ pageType, openModal }: HeaderProps) => {
  return (
    <Header>
      <HeaderText variant="h2">{pageType.toUpperCase()}</HeaderText>
      {pageType === NewsPageType.ARTICLES && <AddButton openModal={openModal} />}
    </Header>
  );
};

export default NewsHeader;
