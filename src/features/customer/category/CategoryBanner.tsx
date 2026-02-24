export function CategoryBanner() {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-sm relative h-[200px] md:h-[240px] mb-4">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-transparent z-10 flex flex-col justify-center px-8 md:px-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 shadow-sm drop-shadow-md">
          Tết Sum Vầy <br />
          Đong Đầy Hạnh Phúc
        </h2>
        <p className="text-white/90 text-sm md:text-base mb-4 max-w-[500px]">
          Khám phá bộ sưu tập quà tặng Tết Nguyên Đán 2024 độc đáo, ý nghĩa dành
          tặng người thân và đối tác.
        </p>
        <button className="w-fit bg-yellow-400 text-red-900 font-bold px-4 py-2 rounded text-sm hover:bg-yellow-300 transition-colors cursor-pointer">
          Mua ngay
        </button>
      </div>
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDc6BR9Kw6F6fgeS3EBcvTrTtQhkm2g8u7TeaBvCbEb8Q446NPPZ9FFwsWUvuWxXqaHwoXzKRCDSF9lmTN3R11Gdd9hKqiN1NkQdgo12XQ2SSBezrzaWlpiGYB9i9xNH6o7ptOMbLYg4EWCle8vBxrPAfktmbqKod6DSwYfSge6ITmuK136gJcmuEcLhUva_8yAvbnnwdZPURk8pML5E5kaNZsnUnUIVtYZC6DtNINDblj8ae1Ge3Rjcq0yU8ePzLHs0rZaPsN7C08')",
        }}
      ></div>
    </div>
  );
}
