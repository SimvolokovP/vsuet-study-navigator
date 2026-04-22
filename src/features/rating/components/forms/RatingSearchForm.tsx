// "use client";

// import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { TRatingMode } from "../../types/rating.models";
// import { useUserLocalStorage } from "@/store/use-user-local-storage.store";
// import { Toggler } from "@/components/ui/toggler";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface RatingSearchFormProps {
//   ratingMode: TRatingMode;
//   onRatingModeChange: (mode: TRatingMode) => void;
//   onSearch: (searchValue: string) => void;
//   isSearching: boolean;
// }

// export function RatingSearchForm({
//   ratingMode,
//   onRatingModeChange,
//   onSearch,
//   isSearching,
// }: RatingSearchFormProps) {
//   const [searchValue, setSearchValue] = useState<string>("");
//   const [submittedValue, setSubmittedValue] = useState<string>("");
//   const { userInLocalStorage } = useUserLocalStorage();

//   useEffect(() => {
//     if (ratingMode === "my") {
//       setSearchValue("");
//       setSubmittedValue("");
//       onSearch("");
//     }
//   }, [ratingMode, onSearch]);

//   useEffect(() => {
//     if (ratingMode === "search") {
//       setSearchValue("");
//       setSubmittedValue("");
//     }
//   }, [ratingMode]);

//   const handleSearchSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (searchValue.trim()) {
//       setSubmittedValue(searchValue);
//       onSearch(searchValue);
//     }
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(e.target.value);
//   };

//   const getInputValue = () => {
//     if (ratingMode === "my") {
//       return userInLocalStorage?.number || "";
//     }
//     return searchValue;
//   };

//   const getPlaceholder = () => {
//     if (ratingMode === "my") {
//       return "Номер зачетки (автоматически)";
//     }
//     if (isSearching && submittedValue) {
//       return `Результаты поиска: ${submittedValue}`;
//     }
//     return "Введите номер зачетки";
//   };

//   return (
//     <div className="card anim-hover">
//       <div className="flex w-full justify-center mb-2">
//         <Toggler
//           toggleList={[
//             { value: "my", label: "Мой рейтинг" },
//             { value: "search", label: "Поиск" },
//           ]}
//           activeToggleItem={ratingMode}
//           onToggleChange={(v) => onRatingModeChange(v as TRatingMode)}
//         />
//       </div>

//       <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2">
//         <div className="flex gap-2 justify-between">
//           <Input
//             minLength={6}
//             maxLength={6}
//             name="search"
//             className="flex-1 w-full"
//             placeholder={getPlaceholder()}
//             disabled={ratingMode === "my"}
//             value={getInputValue()}
//             onChange={handleInputChange}
//           />
//           {ratingMode === "search" && (
//             <Button
//               type="submit"
//               className="w-[64px]"
//               variant="primary"
//               disabled={!searchValue.trim() || searchValue.length !== 6}
//             >
//               Найти
//             </Button>
//           )}
//         </div>
//       </form>

//       {ratingMode === "search" && isSearching && submittedValue && (
//         <div className="mt-2 text-sm text-foreground text-center">
//           Поиск по номеру зачетки: {submittedValue}
//         </div>
//       )}
//     </div>
//   );
// }
