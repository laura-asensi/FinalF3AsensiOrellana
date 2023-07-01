import { createContext} from "react";
import useFavoriteDentists from "./useFavoriteDentists";
import useGetDentists from "./useGetDentists";
import useTheme from "./useTheme";

export const GlobalContext = createContext(undefined);

const GlobalContextProvider = ({ children }) => {
	//1. API consuming
	const { dentists } = useGetDentists();

	//2. Favorites

	const {
		favsState,
		addFavoriteDentist,
		removeFavoriteDentist,
		removeAllDentists,
	} = useFavoriteDentists();

	//3. Themes

	const { theme, toggleTheme, isDarkMode } = useTheme();

	return (
		<GlobalContext.Provider
			value={{
				dentists,
				favsState,
				addFavoriteDentist,
				removeFavoriteDentist,
				removeAllDentists,
				theme,
				toggleTheme,
				isDarkMode,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;