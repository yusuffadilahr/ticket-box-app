import { AccordionContent } from "../ui/accordion"

export default function CategoryFilter({ queryGetCategory, setSelectedCategory }:any) {
    return (
        <AccordionContent>
            {
                queryGetCategory?.map((item: any, index: any) => {
                    return (
                        <div key={index} className="flex flex-col space-y-2 mt-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="category"
                                    value={item.id}
                                    onChange={(e) =>
                                        setSelectedCategory(parseInt(e.target.value))
                                    }
                                    className="form-radio text-blue-600 focus:ring-blue-500"
                                />
                                <span className='font-normal'>{item.Category}</span>
                            </label>
                        </div>
                    )
                })
            }
        </AccordionContent>
    )
}