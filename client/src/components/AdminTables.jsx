function AdminTables({ contacts = [], subscribers = [], showContacts = true, showSubscribers = true }) {
  return (
    <>
      {showContacts && (
        <div className="table-wrap">
          <h3>Contact Form Responses</h3>
          <div className="table">
            <div className="table-head">
              <span>Name</span>
              <span>Email</span>
              <span>Phone</span>
              <span>City</span>
            </div>
            {contacts.length > 0 ? (
              contacts.map((item) => (
                <div key={item._id} className="table-row">
                  <span>{item.fullName}</span>
                  <span>{item.email}</span>
                  <span>{item.phone}</span>
                  <span>{item.city}</span>
                </div>
              ))
            ) : (
              <div style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>
                No contacts yet
              </div>
            )}
          </div>
        </div>
      )}

      {showSubscribers && (
        <div className="table-wrap">
          <h3>Subscribed Emails</h3>
          <div className="table">
            <div className="table-head">
              <span>Email</span>
              <span>Joined</span>
            </div>
            {subscribers.length > 0 ? (
              subscribers.map((item) => (
                <div key={item._id} className="table-row">
                  <span>{item.email}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <div style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>
                No subscribers yet
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminTables;

