interface ListItem {
    name: string;
    href?: string; // Необов'язково, якщо є
}

interface ServiceItem {
    hours: string;
    title: string;
    price: number;
    button: string;
    features: string[];
}

interface ReviewItem {
    name: string;
    text: string;
    time: string;
}

export interface HomeSection {
    list: ListItem[];
    logo?: string;
    button?: string;
    subtitle?: string;
    title?: string;
    services?: ServiceItem[];
    reviews?: ReviewItem[];
}

export interface Post {
    _id: string;
    home: HomeSection[];
    __v: number;
}
