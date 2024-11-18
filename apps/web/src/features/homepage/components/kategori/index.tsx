import Kategori from "./../../../../components/carousell/kategori/"

export default function KategoriSection({ categoryList, iconComponents }: any) {
    return (
        <section className="w-full h-fit px-20">
            <h1 className="text-2xl font-bold text-center">Kategori</h1>
            <div className="flex justify-center gap-0 lg:gap-10 mt-5">
                <Kategori
                    categoryList={categoryList}
                    iconComponents={iconComponents}
                />
            </div>
        </section>
    )
}