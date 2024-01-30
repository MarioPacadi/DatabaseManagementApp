import React from "react";

export default function NoMatch() {
    return (
      <div style={{
        display: 'flex',
        height: '100vh',
        paddingTop: 15,
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        <h1>404: Page Not Found</h1>
      </div>
    );
  }