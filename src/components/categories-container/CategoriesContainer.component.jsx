import './categories-container.style.scss'
import CategoryItem from '../category-item/CategoryItem.component'
const CategoryContainer = ({categories}) => {
    return (
        <div className='categories-container'>
            {categories.map((category) => {
                return <CategoryItem key={category.id} category={category} />
            })}

        </div>
    )

}
export default CategoryContainer;