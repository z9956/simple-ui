import { create } from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
	it('should renders correctly', () => {
		const tree = create(<Button>Button</Button>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('props', () => {
		const tree = create(
			<Button className="test" variant="primary">
				text
			</Button>,
		);
		expect(tree.root.findByProps({ className: 'test', variant: 'primary' }));
	});
});
