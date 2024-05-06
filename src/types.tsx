type ItemIcons = {
  large: null | string | undefined;
  medium: null | string | undefined;
  small: null | string | undefined;
};

type ItemType = {
  icons: {
    default: string;
  };
  name: string;
  title: string;
};

type ItemNation = {
  color: string;
  icons: ItemIcons;
  name: string;
  title: string;
};

type ItemTypeElem = {
  description: string;
  icons: ItemIcons;
  level: number;
  nation: ItemNation;
  title: string;
  type: ItemType;
};
type FilterItemLevel = {
  title: string;
  checked: boolean;
};

type FilterItem = {
  title: string;
  checked: boolean;
  name: string;
};

type FilterObject = {
  level: FilterItemLevel[];
  nation: FilterItem[];
  type: FilterItem[];
};

export type {
  FilterItem,
  FilterItemLevel,
  FilterObject,
  ItemIcons,
  ItemNation,
  ItemType,
  ItemTypeElem,
};
