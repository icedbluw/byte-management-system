import {
  ArrowDownIcon,
  SparklesIcon,
  TvIcon,
} from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import BackButton from '../components/BackButton';
import Chip from '../components/Chip';
import IconButton from '../components/IconButton';
import Modal from '../components/Modal';
import NavBar from '../components/NavBar';
import NavHeader from '../components/NavHeader';
import Select, { SelectItem } from '../components/Select';
import Switch from '../components/Switch';
import Tab from '../components/TwoStateTab';
import AppLayout from '../layouts/AppLayout';

const SelectShowcase: React.FC = function () {
  const items = React.useMemo<SelectItem[]>(() => {
    return [
      {
        label: 'Fishball',
        value: 'fishball',
      },
      {
        label: 'Cake',
        value: 'cake',
      },
    ];
  }, []);

  const [value, setValue] = React.useState('fishball');

  return (
    <Select items={items} value={value} label="Food" onChange={setValue} />
  );
};

const Components: NextPage = function (props) {
  const router = useRouter();
  const [tab, setTab] = React.useState('none');
  const [modalState, setModalState] = useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    router.push('/404');
  }, [router]);

  return (
    <AppLayout>
      <NavBar>
        <NavHeader />
        <div className="flex min-h-screen w-full flex-col bg-gray-300">
          <h1 className="mb-4 text-3xl font-bold">Components showcase</h1>
          <SelectShowcase />
          <BackButton
            href="/discover-courses"
            className="font-bold text-red-900"
            text="Example"
          />
          <button onClick={() => setModalState(true)}>Open Modal</button>
          {modalState ? (
            <Modal onClose={() => setModalState(false)}>
              <div>asiofh</div>
            </Modal>
          ) : (
            ''
          )}
          <div className="flex">
            <Tab
              text="SAMPLE TEXT"
              Icon={SparklesIcon}
              selectedID={tab}
              tabID="1"
              onClick={() => setTab('1')}
            />
            <Tab
              Icon={SparklesIcon}
              selectedID={tab}
              tabID="2"
              onClick={() => setTab('2')}
              text="underline"
              underline
              className="uppercase"
            />
          </div>
          <div className="flex">
            <Chip scheme={'success'} number={'2'} />
            <Chip
              scheme={'danger'}
              text={'negative text'}
              number={'2'}
              Icon={ArrowDownIcon}
            />
          </div>
          <Switch />
          <IconButton HeroIcon={(props) => <TvIcon />}></IconButton>
        </div>
      </NavBar>
    </AppLayout>
  );
};

export default Components;
