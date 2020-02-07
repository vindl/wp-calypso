/**
 * External dependencies
 */
import { __ as NO__ } from '@wordpress/i18n';
import { BlockEditProps } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import React, { FunctionComponent, ReactElement } from 'react';
import { Redirect, useParams } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { STORE_KEY } from '../stores/onboard';
import DesignSelector from './design-selector';
import StepperWizard from './stepper-wizard';
import VerticalSelect from './vertical-select';
import SignupForm from './signup-form';
import SiteTitle from './site-title';
import CreateSite from './create-site';
import { Attributes } from './types';
import { Step, makePath } from '../path';
import './style.scss';
import VerticalBackground from './vertical-background';
import Link from '../components/link';

const OnboardingEdit: FunctionComponent< BlockEditProps< Attributes > > = () => {
	const { siteVertical, selectedDesign, isCreatingSite } = useSelect( select =>
		select( STORE_KEY ).getState()
	);

	const { step: currentStep, lang } = useParams();

	let stepComponent: ReactElement;
	switch ( currentStep ) {
		case Step.IntentGathering:
			stepComponent = <AcquireIntent />;
			break;

		case Step.DesignSelection:
			stepComponent = ! siteVertical ? (
				<Redirect to={ makePath( Step.IntentGathering, lang ) } />
			) : (
				<DesignSelector />
			);
			break;

		case Step.PageSelection:
			stepComponent = ! selectedDesign ? (
				<Redirect to={ makePath( Step.DesignSelection, lang ) } />
			) : (
				<DesignSelector showPageSelector={ true } />
			);
			break;

		case Step.Signup:
			stepComponent = <SignupForm />;
			break;

		case Step.CreateSite:
			stepComponent = ! isCreatingSite ? (
				<Redirect to={ makePath( Step.IntentGathering, lang ) } />
			) : (
				<CreateSite />
			);
			break;

		default:
			stepComponent = <Redirect to={ makePath( Step.IntentGathering, lang ) } />;
			break;
	}

	return (
		<>
			<VerticalBackground />
			{ stepComponent }
		</>
	);
};

export default OnboardingEdit;

const AcquireIntent: FunctionComponent = () => {
	const { siteVertical, siteTitle } = useSelect( select => select( STORE_KEY ).getState() );
	return (
		<div className="onboarding-block__acquire-intent">
			<div className="onboarding-block__questions">
				<h2 className="onboarding-block__questions-heading">
					{ ! siteVertical &&
						! siteTitle &&
						NO__( "Let's set up your website – it takes only a moment." ) }
				</h2>
				<StepperWizard
					stepComponents={ [ VerticalSelect, ( siteVertical || siteTitle ) && SiteTitle ] }
				/>
				{ siteVertical && (
					<div className="onboarding-block__footer">
						<Link to={ Step.DesignSelection } className="onboarding-block__question-skip" isLink>
							{ /* @TODO: add transitions and correct action */ }
							{ siteTitle ? NO__( 'Continue' ) : NO__( "Don't know yet" ) } →
						</Link>
					</div>
				) }
			</div>
		</div>
	);
};
