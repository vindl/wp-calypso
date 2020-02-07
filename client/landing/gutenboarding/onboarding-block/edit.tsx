/**
 * External dependencies
 */
import { BlockEditProps } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import React, { FunctionComponent } from 'react';
import { Redirect, useParams, Switch, Route } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { STORE_KEY } from '../stores/onboard';
import DesignSelector from './design-selector';
import SignupForm from './signup-form';
import CreateSite from './create-site';
import { Attributes } from './types';
import { Step, makePath } from '../path';
import './style.scss';
import VerticalBackground from './vertical-background';
import AcquireIntent from './acquire-intent';

const OnboardingEdit: FunctionComponent< BlockEditProps< Attributes > > = () => {
	const { siteVertical, selectedDesign, isCreatingSite } = useSelect( select =>
		select( STORE_KEY ).getState()
	);

	const { lang } = useParams();

	return (
		<>
			<VerticalBackground />
			<Switch>
				<Route path={ makePath( Step.IntentGathering ) }>
					<AcquireIntent />
				</Route>

				<Route path={ makePath( Step.DesignSelection ) }>
					{ ! siteVertical ? (
						<Redirect to={ makePath( Step.IntentGathering, lang ) } />
					) : (
						<DesignSelector />
					) }
				</Route>

				<Route path={ makePath( Step.PageSelection ) }>
					{ ! selectedDesign ? (
						<Redirect to={ makePath( Step.DesignSelection, lang ) } />
					) : (
						<DesignSelector showPageSelector />
					) }
				</Route>

				<Route path={ makePath( Step.Signup ) }>
					<SignupForm />;
				</Route>

				<Route path={ makePath( Step.CreateSite ) }>
					{ ! isCreatingSite ? (
						<Redirect to={ makePath( Step.IntentGathering, lang ) } />
					) : (
						<CreateSite />
					) }
				</Route>
				<Route>
					<Redirect to={ makePath( Step.IntentGathering, lang ) } />;
				</Route>
			</Switch>
		</>
	);
};

export default OnboardingEdit;
