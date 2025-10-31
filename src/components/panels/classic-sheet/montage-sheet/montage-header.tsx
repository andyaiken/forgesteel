import { HeaderImage } from '@/components/panels/classic-sheet/header-image/header-image';
import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { MontageSheet } from '@/models/classic-sheets/montage-sheet';
import { Options } from '@/models/options';
import { useMemo } from 'react';

import './montage-header.scss';

interface Props {
	montage: MontageSheet;
	options: Options;
}

export const MontageHeaderCard = (props: Props) => {
	const montage = useMemo(() => props.montage, [ props.montage ]);

	const getDifficultyTable = () => {
		return (
			<div className='difficulty-table'>
				<h2>Montage Test Difficulty</h2>
				<table>
					<thead>
						<tr>
							<th>Difficulty</th>
							<th>Success Limit</th>
							<th>Failure Limit</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Easy</td>
							<td>5</td>
							<td>5</td>
						</tr>
						<tr>
							<td>Moderate</td>
							<td>6</td>
							<td>4</td>
						</tr>
						<tr>
							<td>Hard</td>
							<td>7</td>
							<td>3</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	};

	const getLimitsBoxes = () => {
		return (
			<>
				<LabeledTextField
					label='Success Limit'
					content={montage.successLimit}
					additionalClasses={[ 'box-both', 'label-above' ]}
				/>
				<LabeledTextField
					label='Failure Limit'
					content={montage.failureLimit}
					additionalClasses={[ 'box-both', 'label-above' ]}
				/>
				<LabeledTextField
					label='Difficulty'
					content={montage.difficulty}
					additionalClasses={[ 'box-both', 'label-above' ]}
				/>
			</>
		);
	};

	const getLimitsSection = () => {
		if (montage.difficulty) {
			return getLimitsBoxes();
		} else {
			return getDifficultyTable();
		}
	};

	return (
		<div className='montage-header card'>
			<HeaderImage />
			<section className='container overview'>
				<LabeledTextField
					label='Montage'
					content={montage.name}
					additionalClasses={[ 'name', 'no-box', 'text-left' ]}
				/>
			</section>
			<section className='container stats'>
				<LabeledTextField
					label='Rounds'
					content='2'
					additionalClasses={[ 'num-rounds', 'box-both', 'label-above' ]}
				/>
				<LabeledTextField
					label='# Heroes'
					content={montage.numHeroes}
					additionalClasses={[ 'box-both', 'label-above' ]}
				/>
				{getLimitsSection()}
			</section>
		</div>
	);
};
