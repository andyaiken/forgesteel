import { ReactNode, useState } from 'react';
import { Spin, notification } from 'antd';
import { ConnectionSettings } from '@/models/connection-settings';
import { DataService } from '@/services/data-service';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FooterParams } from '@/components/panels/app-footer/app-footer';
import { RulesPage } from '@/enums/rules-page';
import { useErrorListener } from '@/hooks/use-error-listener';
import { useHeroActions } from '@/hooks/use-hero-actions';
import { useLibraryActions } from '@/hooks/use-library-actions';
import { useModals } from '@/hooks/use-modals';
import { usePersistence } from '@/hooks/use-persistence';
import { useSessionActions } from '@/hooks/use-session-actions';

import { AppRoutes } from '@/components/main/app-routes';
import './main.scss';

interface Props {
	connectionSettings: ConnectionSettings;
	dataService: DataService;
}

export const Main = (props: Props) => {
	const [ notify, notifyContext ] = notification.useNotification();

	const [ errors, setErrors ] = useState<Event[]>([]);
	const [ drawer, setDrawer ] = useState<ReactNode>(null);
	const [ playerView, setPlayerView ] = useState<Window | null>(null);
	const [ spinning, setSpinning ] = useState(false);

	useErrorListener(event => setErrors([ ...errors, event ]));

	const persistence = usePersistence({
		notify,
		playerView,
		connectionSettings: props.connectionSettings,
		dataService: props.dataService
	});
	const { connectionSettings, dataService, persistHero, persistSession } = persistence;

	const libraryActions = useLibraryActions({
		notify,
		setDrawer,
		setSpinning,
		persistHero,
		persistHomebrewSourcebook: persistence.persistHomebrewSourcebook
	});
	const { exportLibraryElementData, copyLibraryElementCode } = libraryActions;

	const heroActions = useHeroActions({ notify, setDrawer, setSpinning, persistHero, exportLibraryElementData, copyLibraryElementCode });
	const sessionActions = useSessionActions({ persistSession });

	const modals = useModals({
		notify,
		setDrawer,
		setErrors,
		setPlayerView,
		errors,
		connectionSettings,
		dataService,
		persistHero,
		persistSession,
		persistHomebrewSourcebook: persistence.persistHomebrewSourcebook,
		replaceHomebrewSourcebook: persistence.replaceHomebrewSourcebook,
		deleteHomebrewSourcebook: persistence.deleteHomebrewSourcebook,
		persistConnectionSettings: persistence.persistConnectionSettings,
		exportLibraryElementData,
		copyLibraryElementCode
	});

	const footerParams: FooterParams = {
		errorsExist: errors.length > 0,
		showReference: hero => modals.onShowReference(hero, RulesPage.Rules),
		showAbout: modals.showAbout,
		showSettings: modals.showSettings,
		showErrors: modals.showErrors,
		connectionSettings: connectionSettings
	};

	return (
		<ErrorBoundary name='main'>
			<AppRoutes
				footerParams={footerParams}
				connectionSettings={connectionSettings}
				drawer={drawer}
				setDrawer={setDrawer}
				persistence={persistence}
				libraryActions={libraryActions}
				heroActions={heroActions}
				sessionActions={sessionActions}
				modals={modals}
			/>
			{notifyContext}
			<Spin spinning={spinning} size='large' fullscreen={true} />
		</ErrorBoundary>
	);
};
