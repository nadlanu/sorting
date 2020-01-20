import React, { Component } from 'react'
import './App.css';
import TestSort from './components/TestSort';
import BubbleSort from './components/BubbleSort';
import axios from 'axios';
import Question from './components/Question';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: false,
      selection: "1",
      questions: [],
      randomWord: "",
      randomWordTranslation: "",
      word: "",
      dictionary: [],
      translatedWord: "",
      currentLang: { lang: "English" , code: "en" },
      translateLang: { lang: "Serbian" , code: "sr" },
      languages: [
        { lang: "Afrikaans" , code: "af" },
        { lang: "Irish" , code: "ga" },
        { lang: "Albanian" , code: "sq" },
        { lang: "Italian" , code: "it" },
        { lang: "Arabic" , code: "ar" },
        { lang: "Japanese" , code: "ja" },
        { lang: "Azerbaijani" , code: "az" },
        { lang: "Kannada" , code: "kn" },
        { lang: "Basque" , code: "eu" },
        { lang: "Korean" , code: "ko" },
        { lang: "Bengali" , code: "bn" },
        { lang: "Latin" , code: "la" },
        { lang: "Belarusian" , code: "be" },
        { lang: "Latvian" , code: "lv" },
        { lang: "Bulgarian" , code: "bg" },
        { lang: "Lithuanian" , code: "lt" },
        { lang: "Catalan" , code: "ca" },
        { lang: "Macedonian" , code: "mk" },
        { lang: "Chinese Simplified" , code: "zh-CN" },
        { lang: "Malay" , code: "ms" },
        { lang: "Chinese Traditional" , code: "zh-TW" },
        { lang: "Maltese" , code: "mt" },
        { lang: "Croatian" , code: "hr" },
        { lang: "Norwegian" , code: "no" },
        { lang: "Czech" , code: "cs" },
        { lang: "Persian" , code: "fa" },
        { lang: "Danish" , code: "da" },
        { lang: "Polish" , code: "pl" },
        { lang: "Dutch" , code: "nl" },
        { lang: "Portuguese" , code: "pt" },
        { lang: "English" , code: "en" },
        { lang: "Romanian" , code: "ro" },
        { lang: "Esperanto" , code: "eo" },
        { lang: "Russian" , code: "ru" },
        { lang: "Estonian" , code: "et" },
        { lang: "Serbian" , code: "sr" },
        { lang: "Filipino" , code: "tl" },
        { lang: "Slovak" , code: "sk" },
        { lang: "Finnish" , code: "fi" },
        { lang: "Slovenian" , code: "sl" },
        { lang: "French" , code: "fr" },
        { lang: "Spanish" , code: "es" },
        { lang: "Galician" , code: "gl" },
        { lang: "Swahili" , code: "sw" },
        { lang: "Georgian" , code: "ka" },
        { lang: "Swedish" , code: "sv" },
        { lang: "German" , code: "de" },
        { lang: "Tamil" , code: "ta" },
        { lang: "Greek" , code: "el" },
        { lang: "Telugu" , code: "te" },
        { lang: "Gujarati" , code: "gu" },
        { lang: "Thai" , code: "th" },
        { lang: "Haitian Creole" , code: "ht" },
        { lang: "Turkish" , code: "tr" },
        { lang: "Hebrew" , code: "iw" },
        { lang: "Ukrainian" , code: "uk" },
        { lang: "Hindi" , code: "hi" },
        { lang: "Urdu" , code: "ur" },
        { lang: "Hungarian" , code: "hu" },
        { lang: "Vietnamese" , code: "vi" },
        { lang: "Icelandic" , code: "is" },
        { lang: "Welsh" , code: "cy" },
        { lang: "Indonesian" , code: "id" },
        { lang: "Yiddish" , code: "yi" }
      ]
    }
  }


  componentDidMount() {

  }

  getWordFromApi = () => {
    axios({
      "method":"GET",
      "url":"https://wordsapiv1.p.rapidapi.com/words/",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key":"481e5f997fmsh881dbdf8ee18581p121d3bjsnb1d4c63ca804"
      },"params":{
      "random":"true"
      }
      })
      .then((response)=>{
        console.log(response.data)
        if (response.data.word.includes(" ")){
          console.log("jok")
          this.getWordFromApi()
          return;
        }
        if (this.state.currentLang.code !== "en") {
          if (this.state.translateLang.code !=="en") {
            this.translateGivenWord(response.data.word, 1)
          } else {
            this.translateGivenWord(response.data.word, 0)
          }
        } else {
          this.translateToAnswer(response.data.word)
        }
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  translateGivenWord = (word, type) => {
    var sourceText = word
    var sourceLang = "en"
    var targetLang = this.state.currentLang.code
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
              + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    if (type === 0) {
      axios.get(url).then(res=>{ this.setState({ randomWord: res.data[0][0][0], randomWordTranslation: sourceText, word: "" }) });
    } else {

      axios.get(url).then(res => {
        
        var urlTwo = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
      + this.state.currentLang.code + "&tl=" + this.state.translateLang.code + "&dt=t&q=" + encodeURI(res.data[0][0][0]);
      axios.get(urlTwo).then(rez => {
        this.setState({ randomWord: res.data[0][0][0], randomWordTranslation: rez.data[0][0][0], word: "" })
        })
      })
    }
  }

  translateToAnswer = (word) => {
    console.log(word)
    var sourceText = word
    var sourceLang = this.state.currentLang.code
    var targetLang = this.state.translateLang.code
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
              + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    axios.get(url).then(res=>{ this.setState({ randomWord: word ,randomWordTranslation: res.data[0][0][0], word: "" }) });
    }

  handleTranslation = (event) => {
    event.preventDefault();
    if (this.state.word === this.state.randomWordTranslation) {
      console.log("brao")
      const addToDict = {
        word: this.state.randomWord,
        translation: this.state.randomWordTranslation
      }
      this.setState({ dictionary: [...this.state.dictionary, addToDict] })
      this.getWordFromApi()
    } else {
      console.log("jok")
    }
    // var sourceText = this.state.word
    
    // var sourceLang = this.state.currentLang.code

    // var targetLang = this.state.translateLang.code
    
    // var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
    //           + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    
    // axios.get(url).then(res=>{ this.setState({ translatedWord: res.data[0][0][0] }) });
}

handleLangChange = (event) => {
  this.setState({
    [event.target.name]: this.state.languages[event.target.value]
  })
}

handleFieldChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}


  onSelectChange = (event) => {
    this.setState({
      selection: event.target.value
    })

  }

  startGame = (event) => {
    event.preventDefault();
    this.setState({
      selected: true
    })
  }
  
  render() {
    let { questions } = this.state;

    if (!this.state.selected) {
      return (
        <div>
          <div className="container">
            niste izabrali
            {/* <form onSubmit={this.startGame}>
            <select name="selection" id="selection" className="form-control" value={this.state.selection} onChange={this.onSelectChange}>
                      <option value="1">Test Sort</option>
                      <option value="2">Bubble Sort</option>
                      <option value="3">Heap sort</option>
                  </select>
                  <button type="submit">Go!</button>
            </form> */}
            {( this.state.randomWord === "" ? <button onClick={this.getWordFromApi}>Start</button> : "" )}
          {(this.state.randomWord === "" ? <p>Niste poceli jos</p> : <p>{this.state.randomWord}</p>)}
            <form onSubmit={this.handleTranslation}>
              <div style={{width: "100%"}}>
                <label htmlFor="word">Word: </label>
                <input type="text" className="form-control" name="word" id="word" value={this.state.word} onChange={this.handleFieldChange}/>
              </div>
              <label htmlFor="currentLang">From:</label>
              <select name="currentLang" id="currentLang" className="form-control" value={this.state.languages.indexOf(this.state.currentLang)} onChange={this.handleLangChange}>
                { this.state.languages.map(lan => (
                  <option key={this.state.languages.indexOf(lan)} value={this.state.languages.indexOf(lan)}>{lan.lang}</option>
                )) }
              </select>
              <label htmlFor="translateLang">To:</label>
              <select name="translateLang" id="translateLang" className="form-control" value={this.state.languages.indexOf(this.state.translateLang)} onChange={this.handleLangChange}>
                { this.state.languages.map(lan => (
                  <option key={this.state.languages.indexOf(lan)} value={this.state.languages.indexOf(lan)}>{lan.lang}</option>
                )) }
              </select>
              <button type="submit" className="btn btn-primary">Translate</button>
            </form>
              <p>{this.state.word}</p>
              <table className="table">
  <thead className="thead-dark">
    <tr>
                <th scope="col">{this.state.currentLang.lang}</th>
      <th scope="col">{this.state.translateLang.lang}</th>
    </tr>
        </thead>
        <tbody>
            { this.state.dictionary.map(el => (
              <tr key={this.state.dictionary.indexOf(el)}>
              <th>{el.word}</th>
            <td>{el.translation}</td>
              </tr>
          )) }
              </tbody>
            </table>
                  
          {/* { this.state.questions.map(currentQuestion => (
            <Question question={currentQuestion} key={this.state.questions.indexOf(currentQuestion)}/>
          )) } */}
          </div>
        </div>
      )
    } else {
      switch (this.state.selection) {
        case "1":
          return (
            <div>
              <TestSort/>
            </div>
          )
        case "2":
            return (
              <div>
               <BubbleSort />
              </div>
            )
        default:
          return (
            <div>
              aha
            </div>
          )
      }
    }
    
  }
}

export default App
