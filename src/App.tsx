import { useState } from 'react';
import { TabType, EmergencyContact, CheckInRecord } from './types';
import { INITIAL_CONTACTS, INITIAL_CHECKINS } from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ChatScreen } from './components/ChatScreen';
import { CheckInScreen } from './components/CheckInScreen';
import { JournalScreen } from './components/JournalScreen';
import { SafetyNetScreen } from './components/SafetyNetScreen';
import { EmergencyModal } from './components/EmergencyModal';
import { ContactModal } from './components/ContactModal';
import { PrivacyModal } from './components/PrivacyModal';
import { NotificationModal } from './components/NotificationModal';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('chat');
  const [contacts, setContacts] = useState<EmergencyContact[]>(INITIAL_CONTACTS);
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>(INITIAL_CHECKINS);

  // Modals state
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<EmergencyContact | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSaveCheckIn = (record: CheckInRecord) => {
    setCheckIns(prev => [record, ...prev]);
  };

  const handleOpenAddContact = () => {
    setContactToEdit(null);
    setIsContactModalOpen(true);
  };

  const handleEditContact = (contact: EmergencyContact) => {
    setContactToEdit(contact);
    setIsContactModalOpen(true);
  };

  const handleSaveContact = (contact: EmergencyContact) => {
    setContacts(prev => {
      const exists = prev.some(c => c.id === contact.id);
      if (exists) {
        return prev.map(c => (c.id === contact.id ? contact : c));
      }
      return [...prev, contact];
    });
  };

  return (
    <div className="min-h-screen bg-[#0d1512] text-[#dbe5df] flex flex-col antialiased selection:bg-[#7e9786] selection:text-[#092015]">
      {/* Top Application Header */}
      <Header
        currentTab={currentTab}
        onOpenSOSModal={() => setIsSOSModalOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        notificationCount={1}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full overflow-x-hidden">
        {currentTab === 'home' && (
          <HomeScreen
            onNavigateTab={tab => setCurrentTab(tab)}
            onOpenSOSModal={() => setIsSOSModalOpen(true)}
            recentCheckIns={checkIns}
            contacts={contacts}
          />
        )}

        {currentTab === 'chat' && (
          <ChatScreen
            onNavigateToCheckin={() => setCurrentTab('checkin')}
            onOpenSOSModal={() => setIsSOSModalOpen(true)}
          />
        )}

        {currentTab === 'checkin' && (
          <CheckInScreen
            onSaveCheckIn={handleSaveCheckIn}
            onViewJournal={() => setCurrentTab('journal')}
          />
        )}

        {currentTab === 'journal' && (
          <JournalScreen
            checkIns={checkIns}
            onAddNewReflection={handleSaveCheckIn}
            onNavigateToCheckIn={() => setCurrentTab('checkin')}
          />
        )}

        {currentTab === 'safety' && (
          <SafetyNetScreen
            contacts={contacts}
            onOpenAddContact={handleOpenAddContact}
            onEditContact={handleEditContact}
            onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
            onTriggerSOSModal={() => setIsSOSModalOpen(true)}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={tab => setCurrentTab(tab)}
      />

      {/* Interactive Modals */}
      <EmergencyModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        primaryContact={contacts[0]}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSave={handleSaveContact}
        contactToEdit={contactToEdit}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateToCheckIn={() => {
          setIsNotificationsOpen(false);
          setCurrentTab('checkin');
        }}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        contacts={contacts}
        onOpenSafetyNet={() => {
          setIsProfileOpen(false);
          setCurrentTab('safety');
        }}
      />
    </div>
  );
}
