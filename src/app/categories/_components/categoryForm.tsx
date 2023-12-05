import { CategoryNameField } from './categoryNameField';
import { ColorField } from './colorField';
import CategoryFormProvider from './categoryFormProvider';
import IconField from './iconField';

export const CategoryForm = () => (
	<CategoryFormProvider>
		<h2 className="border-b-2 border-dark-gunmetal p-6 text-xl text-white">
			New category
		</h2>
		<CategoryNameField />
		<ColorField />
		<IconField />
	</CategoryFormProvider>
);
