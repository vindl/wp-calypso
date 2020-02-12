/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { Card } from '@automattic/components';
import VerticalNav from 'components/vertical-nav';
import { domainAddNew } from 'my-sites/domains/paths';
import { recordTracksEvent, recordGoogleEvent } from 'state/analytics/actions';
import { withLocalizedMoment } from 'components/localized-moment';
import VerticalNavItemMulti from '../vertical-nav/item-multi';
import DomainStatus from '../card/domain-status';

import CompactFormToggle from 'components/forms/form-toggle/compact';

class RegisteredDomainType extends React.Component {
	getPickCustomDomainNavItem() {
		return (
			<VerticalNavItemMulti
				path={ domainAddNew( this.props.selectedSite.slug ) }
				onClick={ this.handlePickCustomDomainClick }
				materialIcon="search"
				text={ this.props.translate( 'Pick a custom domain' ) }
				description={ this.props.translate( 'Register or transfer custom domain name' ) }
			/>
		);
	}
	getChangeDnsNavItem() {
		return (
			<VerticalNavItemMulti
				path={ domainAddNew( this.props.selectedSite.slug ) }
				onClick={ this.handlePickCustomDomainClick }
				materialIcon="language"
				text={ this.props.translate( 'Change your nameservers & DNS records' ) }
				description={ this.props.translate( 'Destination: somewhere' ) }
			/>
		);
	}

	getEmailNavItem() {
		return (
			<VerticalNavItemMulti
				path={ domainAddNew( this.props.selectedSite.slug ) }
				onClick={ this.handlePickCustomDomainClick }
				materialIcon="email"
				text={ this.props.translate( 'Manage your email accounts' ) }
				description={ this.props.translate( '3 G Suite accounts' ) }
			/>
		);
	}

	getContactInformationNavItem() {
		return (
			<VerticalNavItemMulti
				path={ domainAddNew( this.props.selectedSite.slug ) }
				onClick={ this.handlePickCustomDomainClick }
				materialIcon="chrome_reader_mode"
				text={ this.props.translate( 'Update your contact information' ) }
				description={ this.props.translate( 'Privacy protection: on' ) }
			/>
		);
	}

	getTransferYourDomainNavItem() {
		return (
			<VerticalNavItemMulti
				path={ domainAddNew( this.props.selectedSite.slug ) }
				onClick={ this.handlePickCustomDomainClick }
				materialIcon="cached"
				text={ this.props.translate( 'Transfer your domain' ) }
				description={ this.props.translate( 'Transfer lock: off' ) }
			/>
		);
	}

	getReviewYourSecurityNavItem() {
		return (
			<VerticalNavItemMulti
				path={ domainAddNew( this.props.selectedSite.slug ) }
				onClick={ this.handlePickCustomDomainClick }
				materialIcon="lock"
				text={ this.props.translate( 'Review your domain security' ) }
				description={ this.props.translate( 'HTTPS encryption: on' ) }
			/>
		);
	}

	getFindSimilarDomainsNavItem() {
		return (
			<VerticalNavItemMulti
				path={ domainAddNew( this.props.selectedSite.slug ) }
				onClick={ this.handlePickCustomDomainClick }
				materialIcon="search"
				text={ this.props.translate( 'Find similar domains' ) }
				description={ this.props.translate( 'We offer more than 300 domain extensions' ) }
			/>
		);
	}

	getDeleteDomainNavItem() {
		return (
			<VerticalNavItemMulti
				path={ domainAddNew( this.props.selectedSite.slug ) }
				onClick={ this.handlePickCustomDomainClick }
				materialIcon="delete"
				text={ this.props.translate( 'Delete your domain permanently' ) }
			/>
		);
	}

	getVerticalNavigation() {
		return (
			<VerticalNav>
				{ this.getChangeDnsNavItem() }
				{ this.getEmailNavItem() }
				{ this.getPickCustomDomainNavItem() }
				{ this.getContactInformationNavItem() }
				{ this.getTransferYourDomainNavItem() }
				{ this.getReviewYourSecurityNavItem() }
				{ this.getFindSimilarDomainsNavItem() }
				{ this.getDeleteDomainNavItem() }
			</VerticalNav>
		);
	}

	render() {
		const { domain, moment } = this.props;
		const { name: domain_name } = domain;

		// const recentlyRegistered = moment
		// 	.utc( registrationDate )
		// 	.isAfter( moment.utc().subtract( 15, 'minutes' ) );

		return (
			<div className="domain-types__container">
				<DomainStatus
					header={ domain_name }
					statusText={ this.props.translate( 'Active' ) }
					statusClass="status-success"
					icon="check_circle"
				/>
				<Card compact={ true }>Expires: { moment( domain.expiry ).format( 'LL' ) }</Card>
				<Card compact={ true }>
					Auto Renew (on) <CompactFormToggle checked={ true } />
				</Card>
				{ this.getVerticalNavigation() }
			</div>
		);
	}
}

export default connect( null, { recordTracksEvent, recordGoogleEvent } )(
	withLocalizedMoment( localize( RegisteredDomainType ) )
);
