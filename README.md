# React Visual Studio Code

<hr />

## 🎉 This project was created with the help of [@monaco-react](https://github.com/suren-atoyan/monaco-react), Nextjs & TailwindCSS 🎉

<br/>

<img src="https://multi-monaco.s3.eu-west-2.amazonaws.com/editor.jpg" alt="React VS Code Editor"/>

<br/>

# Features 👇

<br/>

<ul>
  <li>
    Syntax highlighting & autocomplete
  </li>
  <li>
    Multitabs 
  </li>
  <li>
    Persistent storage of files 
  </li>
  <li>
     & several more 
  </li>
</ul>

<br/>

# How to use it?

<br/>

<ul>
  <li>
    To create press the orange icon just below the explorer.
  </li>
  <li>
    To delete a file click on the cancel icon next to the filename.
  </li>
   <li>
    To rename double click on the file you'd like to rename.
  </li>
  <li>
    To save make an edit and click the save icon in the bottom corner.
  </li>
  <li>
    To log the files click the last icon in the bottom corner.
  </li>
</ul>

<br/>

# Choices I made 🤞

<br/>

<ul>
  <li>
    <div>
    👉 <u>Redux vs Context</u> 
    </div>
    
      This project contains complex & high frequency updates on the state, optimizing Context will be significantly more complex than Redux. Context triggers re-renders on every update.
    
    
      Every selector was cached using a connector, to try reduce the amount of re-renders.
    
  </li>
  <li>
    <div>
    👉 <u>Project Structure & Logic</u> 
    </div>
    
      This project contains one page, therefore I decided to try keep all the logic within the index page.
    
    
      Custom hooks were created for dispatching redux actions.
    
  </li>
  <li>
    <div>
    👉 <u>Todo's</u> 
    </div>
    
      Purifying and perfomance testing components.
    
    
      Writing Unit, Integration & End-to-end tests.
    
    
      Refactor & optimize CSS.
    
     
      Alert & Confirmation dialogs.
    
  </li>
</ul>

<br/>
