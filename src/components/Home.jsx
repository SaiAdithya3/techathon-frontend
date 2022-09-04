import React, { useState, useEffect } from 'react';
import axios from 'axios';
import stubs from '../defaultStubs';
import moment from 'moment';


import AceEditor from 'react-ace';
import 'brace/mode/java';

import 'brace/theme/github';

const Home = () => {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);


  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  const renderTimeDetails = () => {
    if (!jobDetails) {
      return "";
    }
    let { submittedAt, startedAt, completedAt } = jobDetails;
    let result = "";
    submittedAt = moment(submittedAt).toString();
    result += `Job Submitted At: ${submittedAt}  `;
    if (!startedAt || !completedAt) return result;
    const start = moment(startedAt);
    const end = moment(completedAt);
    const diff = end.diff(start, "seconds", true);
    result += `Execution Time: ${diff}s`;
    return result;
  };

  const handleSubmit = async () => {

    const payload = {
      language,
      code
    };
    try {
      setJobId("");
      setStatus("");
      setOutput("");
      setJobDetails(null);

      const { data } = await axios.post("http://localhost:5000/run", payload);
      console.log(data);
      setJobId(data.jobId);
      let intervalId;

      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get("http://localhost:5000/status", { params: { id: data.jobId } });
        const { success, job, error } = dataRes;
        console.log(dataRes);
        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          setStatus(jobStatus);
          setJobDetails(job);

          if (jobStatus === "pending") return;
          setOutput(jobOutput);
          clearInterval(intervalId);

        } else {
          setStatus("Error: Please retry!")
          console.log(error);
          clearInterval(intervalId);
          setOutput(error);
        }
        console.log(dataRes);
      }, 1000);
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
        console.log(response);
      } else {
        setOutput("Error connecting to server!");
      }
    }

  };



  return (
    <div className='App'>
      <h1 class="h1">Online Code Compiler</h1>
      <div>

        <select value={language}
        className='dropdown'
          onChange={(e) => {
            let response = window.confirm("WARNING! Switching the language, will remove your current code. Do you wish to proceed?");
            if (response) {
              setLanguage(e.target.value);
            }
          }}>
          <label>Language:</label>
          <option>C</option>
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <div className="row">
        <div className="col">
          {/* <AceEditor
            mode="java"
            theme="tomorrow_night"
            value={code}
            onChange={(e) => { setCode(e.target.value) }}
            name="code"
            editorProps={{$blockScrolling: true}}
            fontSize="20px"
          // editorProps={{
          //     $blockScrolling: true
          // }}
          /> */}
          <textarea className='textarea' rows="20" cols="75" value={code} onChange={(e)=>{setCode(e.target.value)}}></textarea>
        </div>
          <div className="col right">
            <p className='status'>Status: {status}🎉</p>
            <p className='id'>{jobId && `${jobId}`}</p>
            <div>{output}</div>

          </div>
      </div>
      
      <br />
      <button className='button' onClick={handleSubmit}>Run Code</button>
      <p>{renderTimeDetails}</p>
    </div>
  )
}

export default Home;