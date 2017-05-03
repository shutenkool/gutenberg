/**
 * Internal dependencies
 */
import './style.scss';
import { registerBlock, query as hpq } from 'api';
import Editable from 'components/editable';

const { children, query, attr } = hpq;

registerBlock( 'core/pullquote', {
	title: wp.i18n.__( 'Pullquote' ),
	icon: 'format-quote',
	category: 'common',

	attributes: {
		value: query( 'blockquote > p', children() ),
		citation: children( 'footer' ),
	},

	edit( { attributes, setAttributes, focus, setFocus } ) {
		const { value, citation } = attributes;

		return (
			<blockquote className="blocks-pullquote">
				<Editable
					value={ value || 'Write quote...' }
					onChange={
						( nextValue ) => setAttributes( {
							value: nextValue
						} )
					}
					focus={ focus && focus.editable === 'value' ? focus : null }
					onFocus={ () => setFocus( { editable: 'value' } ) }

				/>
				{ ( citation || !! focus ) && (
					<footer>
						<Editable
							value={ citation || 'Write citation...' }
							onChange={
								( nextCitation ) => setAttributes( {
									citation: nextCitation
								} )
							}
							focus={ focus && focus.editable === 'citation' ? focus : null }
							onFocus={ () => setFocus( { editable: 'citation' } ) }
						/>
					</footer>
				) }
			</blockquote>
		);
	},

	save( { attributes } ) {
		const { value, citation } = attributes;

		return (
			<blockquote className="blocks-pullquote">
				{ value && wp.element.Children.map( value, ( paragraph, i ) => (
					<p key={ i }>{ paragraph }</p>
				) ) }
				<footer>{ citation }</footer>
			</blockquote>
		);
	}
} );
