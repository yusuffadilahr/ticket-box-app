export default function PointReferralDiscount({ profileDiscount, useReferralDiscount, toggleReferralDiscount, profilePoint, pointsToDeduct, setPointsToDeduct }:any) {
    return (
        <>
            {
                profilePoint > 0 && profilePoint && (
                    <div className="mt-4">
                        <label className="text-sm text-gray-700">Gunakan Poin (Max: {profilePoint}):</label>
                        <input
                            type="number"
                            max={profilePoint}
                            value={pointsToDeduct}
                            onChange={(e) => setPointsToDeduct(Math.min(profilePoint, parseInt(e.target.value) || 0))}
                            className="w-full p-2 mt-1 rounded border border-gray-300"
                        />
                    </div>
                )
            }

            {
                profileDiscount > 0 && profileDiscount && (

                    <div className=" flex items-center mt-4">
                        <input
                            type="checkbox"
                            id="useReferralDiscount"
                            checked={useReferralDiscount}
                            onChange={toggleReferralDiscount}
                            className="mr-2"
                        />
                        <label htmlFor="useReferralDiscount" className="text-sm font-semibold">
                            Use Referral Discount
                        </label>
                    </div>

                )

            }
        </>
    )
}