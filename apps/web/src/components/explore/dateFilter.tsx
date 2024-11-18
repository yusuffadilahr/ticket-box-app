import { AccordionContent } from "../ui/accordion"

export default function DateFilter({ dateFrom, dateUntil, setDateUntil, setDateFrom }:any) {
    return (
        <AccordionContent>
            <div>
                <div className="flex flex-col gap-3">
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-500">
                            Start Date
                        </span>
                        <input
                            type="date"
                            name="startDate"
                            value={dateFrom ?? ''}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-500">End Date</span>
                        <input
                            type="date"
                            name="endDate"
                            value={dateUntil ?? ''}
                            onChange={(e) => setDateUntil(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                </div>
            </div>
        </AccordionContent>
    )
}