export class Restaurant {
    _id?: String;
    name: String;
    image_path: String;
    restaurant_features?: Array<object>;
    establishment_type?: Array<string>;
    meals?:Array<string>;
    price_range?: String;
    cuisine?:Array<string>;
    dietary_restrictions?:Array<string>;
    location?:String;
    phone?:Number;
    reviews?:Array<object>;
    stars?:Number; 
 }