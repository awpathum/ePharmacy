import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getStock, saveStock } from "../services/stockService";
import { getGenres } from "../services/genreService";

class StockForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateStock() {
    try {
      const stockId = this.props.match.params.id;
      if (stockId === "new") return;

      const { data: stock } = await getStock(stockId);
      this.setState({ data: this.mapToViewModel(stock) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateStock();
  }

  mapToViewModel(stock) {
    return {
      _id: stock._id,
      title: stock.title,
      genreId: stock.genre._id,
      numberInStock: stock.numberInStock,
      dailyRentalRate: stock.dailyRentalRate
    };
  }

  doSubmit = async () => {
    await saveStock(this.state.data);

    this.props.history.push("/stocks");
  };

  render() {
    return (
      <div>
        <h1>Stock Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default StockForm;