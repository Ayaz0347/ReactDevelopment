import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    headTitle: PropTypes.string,
    category: PropTypes.string,
  };
  static defaultProps = {
    country: "in",
    pageSize: 5,
    headTitle: "India",
    category: "science",
    author: "Unknown",
    publishedAt: "Unknown",
    source: "unknown",
  };
  capitalizedFunction = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };

    document.title = `${this.capitalizedFunction(
      this.props.category
    )} - MonkeyNews`;
  }

  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=6d805dbec208491a9ead2b197007d207&page=1&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
      // page: this.state.page+1,
    });
    // console.log(parsedData);
  }

  handleNextClick = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      console.log("next");
      let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=6d805dbec208491a9ead2b197007d207&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;

      this.setState({ loading: true });

      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    }
  };

  hanldlePreviousClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=6d805dbec208491a9ead2b197007d207&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-5">
        <h1 className="text-center mb-5">
          MonkeyNews : Top {this.props.headTitle} Headlines
        </h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4><Spinner/></h4>}
        >
          <div className="container">

          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 mb-5" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : "Rumour has it that Samsung has finalised prices for the Galaxy S22 series in Europe. Whi"
                    }
                    urlToImage={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://img.etimg.com/thumb/msid-89062662,width-1070,height-580,imgsize-41082,overlay-ettech/photo.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          
          </div>
          
        </InfiniteScroll>
      

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className=" btn btn-dark"
            onClick={this.hanldlePreviousClick}
          >
            &larr; Previous
          </button>

          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className=" btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
