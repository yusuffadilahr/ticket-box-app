import { AccordionContent } from "../ui/accordion"

export default function PriceFilter({ minPrice, setMinPrice, setMaxPrice, maxPrice }:any) {
    return (
        <AccordionContent className="flex flex-col items-start gap-2">
            <div>
                <div className="flex space-x-2 mt-2">
                    <input
                        type="number"
                        name="minPrice"
                        value={minPrice ?? ''}
                        placeholder="Min"
                        className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        onChange={(e) =>
                            setMinPrice(parseInt(e.target.value))
                        }
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        value={maxPrice ?? ''}
                        placeholder="Max"
                        className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        onChange={(e) =>
                            setMaxPrice(parseInt(e.target.value))
                        }
                    />
                </div>
            </div>
        </AccordionContent>
    )
}