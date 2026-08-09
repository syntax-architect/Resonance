import React from 'react';
import { useUser } from '@clerk/clerk-react';

import SidebarNav from './SidebarNav';
import SidebarLibrary from './SidebarLibrary';
import SidebarFooter from './SidebarFooter';

function Sidebar({ openLanguageModal }) {
  const { isSignedIn, user } = useUser();

  return (
    <aside className="sidebar glass-panel animate-fade-in">
      <SidebarNav />
      <SidebarLibrary isSignedIn={isSignedIn} user={user} />
      <SidebarFooter isSignedIn={isSignedIn} openLanguageModal={openLanguageModal} />
    </aside>
  );
}

export default Sidebar;
