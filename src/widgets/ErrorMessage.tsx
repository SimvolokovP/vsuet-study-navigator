export function ErrorMessage({error, text}: {error?: Error, text: string}) {
  return (
    <div className="flex flex-col items-center justify-center card anim-hover p-4 max-w-md mx-auto">
      <div className="font-bold text-center text-lg md:text-xl mb-2 md:mb-4">
        {error?.message || "Произошла ошибка"}
      </div>
      <p className="text-sm md:text-base text-center mb-4">
        {text}
      </p>
    </div>
  );
}
