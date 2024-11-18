import { AccordionContent } from "../ui/accordion"
export default function LocationFilter({ setLocation }: any) {
    return (
        <AccordionContent>
            <input
                type="text"
                name="location"
                placeholder="Lokasi"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setLocation(e.target.value)}
            />
        </AccordionContent>
    )
}