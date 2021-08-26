import * as React from "react";

function Stars({ register, name, errors }) {
  const stars = [""];

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((value) => {
        return (
          <React.Fragment key={value}>
            <input
              {...register(name)}
              type="radio"
              id={`star${value}`}
              name="rate"
              value={value}
            />
            <label htmlFor={`star${value}`} title="text">
              {value} stars
            </label>
          </React.Fragment>
        );
      })}

      {/* <input
        {...register(name)}
        type="radio"
        id="star4"
        name="star"
        value="4"
      />
      <label htmlFor="star4" title="text">
        4 stars
      </label>
      <input
        {...register(name)}
        type="radio"
        id="star3"
        name="star"
        value="3"
      />
      <label htmlFor="star3" title="text">
        3 stars
      </label>
      <input
        {...register(name)}
        type="radio"
        id="star2"
        name="star"
        value="2"
      />
      <label htmlFor="star2" title="text">
        2 stars
      </label>
      <input
        {...register(name)}
        type="radio"
        id="star1"
        name="star"
        value="1"
      />
      <label htmlFor="star1" title="text">
        1 star
      </label> */}

      <p>{errors[name]?.message}</p>
    </div>
  );
}

export default Stars;
