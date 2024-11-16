import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <List>
        <Section>
          <Link to='/join'>Join Event</Link>
          <Link to='/organize'>Organize Event</Link>
          <Link to='/make-cert'>Make Certs</Link>
          <Link to='/me'>Me</Link>
        </Section>
      </List>
    </Page >
  );
};
