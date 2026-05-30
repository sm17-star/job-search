import React from "react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../redux/jobSlice";

const category = [
  "frontend developer",
  "backend developer",
  "data science",
  "fullstack developer",
  "software engineering",
  "AI/ML"
];

const Category = () => {
  const dispatch =useDispatch();
  const navigate=useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse")

  }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-15">
        <CarouselContent>
          {category.map((c, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Button onClick={()=>searchJobHandler(c)} className="rounded-full">
                {c}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Category;