import React, { Component } from 'react';
import "./Contents.css"
import InfiniteScroll from 'react-infinite-scroll-component';

class Contents extends Component{
  constructor(props){
    super(props)
    this.state= {
      page: 0,
      items: 9,
      hasMore: true,
      contentList: [
        {url:"https://static.wikia.nocookie.net/marvel_dc/images/a/a6/Batman_Vol_2_2_Variant_Textless.jpg/revision/latest/scale-to-width-down/328?cb=20120228075313", name: "batman", type: "image/jpeg"},
        {url:"https://www.yescenter.ru/upload/iblock/439/13bf65937a.pdf", name: "moby dick", type: "application/pdf"},
        {url:"https://s3.amazonaws.com/images.seroundtable.com/google-css-images-1515761601.jpg", name: "google", type: "image/jpeg"},
        {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
        {url:"http://127.0.0.1:8080/ferry.mp4", name: "test", type: "video/mp4"},
        {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
        {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
        {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
        {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
      ]
    }
  }

  chunkBy(contentList, chunkSize) {
    const result = contentList.reduce((resultList, content, index) => {
      let chunkIndex = Math.floor(index/chunkSize)

      if(!resultList[chunkIndex]) {
        resultList[chunkIndex] = []
      }

      resultList[chunkIndex].push(content)

      return resultList
    }, [])

    return result
  }

  getTag(content) {
    switch(content.type) {
      case 'image/jpeg':
      case 'image/gif':
      case 'image/png':
        return (
          <img className="imageContent"
          src={content.url}
          />
        )
      case 'video/mp4':
        return (
          <video src={content.url} className="videoContent" type={content.type} controls>
          </video>
        )
      default:
        return (
          <label className="otherContent">{content.type}</label>
        )
    }
  }

  loadMore(page) {
    console.log(page)
    console.log("ASDA=SGHUIJSJDFGIUJOHSDFIOJGHSDJIFHG")
    this.setState({ isLoading: true});
    setTimeout(() => {
      let newContentList = [ {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
      {url:"http://127.0.0.1:8080/ferry.mp4", name: "test", type: "video/mp4"},
      {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
      {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
      {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
      {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
      {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
      {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"},
      {url:"http://127.0.0.1:8080/oogway.jpg", name: "test", type: "image/jpeg"}]
      newContentList = this.state.contentList.concat(newContentList)
      this.setState({ items: this.state.items + 9, loading: false, contentList: newContentList, hasMore: true})
    }, 2000)
  }


  render() {
    const contentsList = this.state.contentList;
    const chunkedContents = this.chunkBy(contentsList, 3);
    
    const contents = chunkedContents.map((chunkedContent) => {
      const row = chunkedContent.map((content) => {
        return(
        <div className="assetCard" id="assetsCell">
          {this.getTag(content)}
        </div>
        )
      })
      console.log("test")
      console.log(row)
      return (
        <div id="assetsRow">
        {row}
        </div>
      )
    })

    return(
      <div id="container">
      <InfiniteScroll
      dataLength={this.state.items}
      next={this.loadMore.bind(this)}
      hasMore={this.state.hasMore}
      loader={<h3>is Loading...</h3>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      >
          {contents}
      </InfiniteScroll>
      </div>
    )
  }


}

export default Contents;
