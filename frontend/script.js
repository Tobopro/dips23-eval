document.addEventListener('DOMContentLoaded', () => {
    const invoicesContainer = document.querySelector('.invoices');
    const wrapperDiv = document.querySelector('.invoice');

    // Fonction pour afficher les factures
    function displayInvoices(invoices) {
        invoicesContainer.innerHTML = '';

        if (invoices.length > 0) {
            invoices.forEach(invoice => {
                const invoiceItem = createInvoiceElement(invoice);
                invoicesContainer.appendChild(invoiceItem);
            });
        } else {
            invoicesContainer.innerHTML = '<p>Aucune facture disponible.</p>';
        }
    }

    // Fonction pour créer un élément de facture
    function createInvoiceElement(invoice) {
        const invoiceItem = document.createElement('div');
        invoiceItem.classList.add('invoice-item');
        invoiceItem.innerHTML = `
        <div class="invoice-item__id">${invoice.invoiceNumber}</div>
        <div class="invoice-item__client">${invoice.firstName} ${invoice.lastName}</div>
        <div class="invoice-item__amount">${invoice.amount}€</div>
        <div class="invoice__status invoice__status--${invoice.status.toLowerCase()}">${invoice.status}</div>
        <button class="view-invoice-btn" data-invoice-id="${invoice.id}">Voir détails</button>
    `;

        // Récupérer le bouton
        const viewInvoiceBtn = invoiceItem.querySelector('.view-invoice-btn');

        // Ajouter un gestionnaire d'événements de clic au bouton
        viewInvoiceBtn.addEventListener('click', () => {
            // Récupérer l'ID de la facture à partir de l'attribut data
            const invoiceId = viewInvoiceBtn.getAttribute('data-invoice-id');
            // Appeler la fonction singleInvoice avec l'ID de la facture
            singleInvoice(invoiceId);
        });

        return invoiceItem;
    }


    function showDetailsInvoice(invoice) {
        const invoiceDetails = document.createElement('div');
        invoiceDetails.classList.add('invoice-details');
        invoiceDetails.innerHTML = `
            <div class="invoice-details__id">${invoice.invoiceNumber}</div>
            <div class="invoice-details__client">${invoice.firstName} ${invoice.lastName}</div>
            <div class="invoice-details__amount">${invoice.amount}€</div>
            <div class="invoice-details__status invoice-details__status--${invoice.status.toLowerCase()}">${invoice.status}</div>
        `;
        return invoiceDetails;
    }

    // Fonction pour charger les factures depuis le serveur
    function loadInvoices() {
        fetch('http://localhost:3000/api/invoices')
            .then(response => response.json())
            .then(data => {
                if (data && data.data) {
                    displayInvoices(data.data);
                } else {
                    invoicesContainer.innerHTML = '<p>Aucune facture disponible.</p>';
                }
            })
            .catch(error => console.error('Error fetching invoices:', error));
    }

    function singleInvoice(id) {
        return fetch(`http://localhost:3000/api/invoices/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data) {
                    // Traitez les données de la facture ici
                    return data.data;
                } else {
                    console.error('Invoice not found');
                    throw new Error('Invoice not found');
                }
            })
            .catch(error => {
                console.error('Error fetching invoice:', error);
                throw error; // Re-lancer l'erreur pour la traiter dans le gestionnaire d'événements de clic
            });
    }

    function createInvoice(title, amount, clientId) {
        fetch('http://localhost:3000/api/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "invoiceNumber": 'INV2024006', "title": title, "amount": amount, "clientId": clientId })
        })
            .then((response) => {
                return response.json();
            }
            )
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    // Fonction pour créer le contenu d'une facture à partir des données de la facture
    function createInvoiceContent(invoice) {
        let payementStatus
        if (invoice.paymentDate === null) {
            payementStatus = '<div class="invoice__status invoice__status--pending">Non Payée</div>'
        } else {
            payementStatus = '<div class="invoice__status invoice__status--paid">Payée</div>'
        }

        return `
         <div class="invoice__actions">
                        <div class="status">
                            <div class="invoice__subtitle">Statut</div>
                            ${payementStatus}
                        </div>
                        <div class="actions">
                            <button class="btn btn--red btn--delete" data-invoice-id="${invoice.id}">Supprimer</button>
                            <button class="btn btn--purple btn--edit" data-invoice-id="${invoice.id}">Indiquée payée</button>
                        </div>
                    </div>
        <div class="invoice__header">
            <div class="text-30-b">${invoice.invoiceNumber}</div>
            <div class="invoice__title">${invoice.title}</div>
        </div>
        <div class="invoice__infos">
            <div class="invoice__infos--client">
                <div class="invoice__subtitle">Client</div>
                <div class="invoice__client bold">${invoice.firstName} ${invoice.lastName}</div>
                <div class="invoice__email bold">${invoice.email}</div>
            </div>
            <div class="invoice__dates">
                <div>
                    <div class="invoice__subtitle">Date de la facture</div>
                    <div class="invoice__date bold">${invoice.createdAt}</div>
                </div>
                <div>
                    <div class="invoice__subtitle">Date de paiement</div>
                    <div class="invoice__date bold">${invoice.paymentDate ? invoice.paymentDate : 'Non payée'}</div>
                </div>
            </div>
        </div>
        <div class="invoice__footer">
            <div class="invoice__text">Total à payer</div>
            <div class="invoice__text">${invoice.amount}€</div>
        </div>
    `;
    }

    // Fonction pour afficher les détails d'une facture dans la div wrapper
    function displayInvoiceDetails(invoice) {
        // Sélectionner la div avec la classe "wrapper"


        // Vider le contenu existant de la div wrapper
        wrapperDiv.innerHTML = '';

        // Créer le contenu de la facture à partir des données de la facture
        const invoiceContent = createInvoiceContent(invoice);

        // Injecter le contenu de la facture dans la div wrapper
        wrapperDiv.innerHTML = invoiceContent;
    }

    // Ajouter un gestionnaire d'événements de clic aux boutons "Voir détails"
    document.addEventListener('click', event => {
        if (event.target.classList.contains('view-invoice-btn')) {
            const invoiceId = event.target.getAttribute('data-invoice-id');
            // Appeler la fonction singleInvoice avec l'ID de la facture
            singleInvoice(invoiceId)
                .then(invoiceData => {
                    console.log('test:', invoiceData);
                    // Traiter les données de la facture ici
                    displayInvoiceDetails(invoiceData); // Afficher les détails de la facture
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else if (event.target.classList.contains('btn--edit')) {
            const invoiceId = event.target.getAttribute('data-invoice-id');
            markInvoiceAsPaid(invoiceId);
            singleInvoice(invoiceId)
        }
    });

    document.addEventListener('click', event => {
        if (event.target.classList.contains('btn--edit')) {
            const invoiceId = event.target.getAttribute('data-invoice-id');

            const confirmChange = confirm("Êtes-vous sûr de vouloir marquer cette facture comme payée ?");
            if (confirmChange) {
                markInvoiceAsPaid(invoiceId);
            } else {
                console.log('Changement de statut de la facture annulé.');
            }

        }
    });

    document.addEventListener('click', event => {
        if (event.target.classList.contains('btn--delete')) {
            const invoiceId = event.target.getAttribute('data-invoice-id');

            // Affichez un message de confirmation
            const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette facture ?");

            if (confirmDelete) {
                // Si l'utilisateur confirme la suppression, appelez la fonction pour supprimer la facture
                deleteInvoice(invoiceId);
            } else {
                // Sinon, annulez l'action
                console.log('Suppression de la facture annulée.');
            }
        }
    });

    document.addEventListener('click', event => {
        if (event.target.classList.contains('btn--create')) {
            createFormNewInvoice();


        }
    });

    function createFormNewInvoice() {
        wrapperDiv.innerHTML = '';



        // Créez une nouvelle div pour contenir le formulaire
        const formWrapper = document.createElement('div');
        formWrapper.classList.add('new-invoice-form-wrapper');

        // Créez un élément de formulaire
        const form = document.createElement('form');
        form.classList.add('new-invoice-form');

        // Structure HTML du formulaire
        form.innerHTML = `
        <h2>Nouvelle Facture</h2>
        <label for="client-name">Titre de la transaction :</label>
        <input type="text" id="client-name" name="client-name" required>
        <label for="amount">Montant :</label>
        <input type="number" id="amount" name="amount" required>
        
        <button type="submit">Créer</button>
    `;

        // Ajouter l'écouteur d'événements de soumission du formulaire
        form.addEventListener('submit', event => {
            event.preventDefault(); // Empêcher le comportement par défaut du formulaire
            // Récupérer les valeurs des champs du formulaire
            const title = document.getElementById('client-name').value;
            let amount = document.getElementById('amount').value;
            // Vous pouvez ensuite traiter les données du formulaire comme vous le souhaitez, par exemple, les envoyer au serveur
            console.log('Données du formulaire :', { title, amount });
            amount = parseInt(amount);
            createInvoice(title, amount, 8);
        });

        // Ajouter le formulaire à la nouvelle div wrapper
        formWrapper.appendChild(form);

        // Ajouter la nouvelle div wrapper à la div avec la classe "invoice"
        wrapperDiv.appendChild(formWrapper);
    }




    function deleteInvoice(invoiceId) {
        fetch(`http://localhost:3000/api/invoices/${invoiceId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete invoice');
                }
                // Affichez un message de succès après la suppression de la facture
                showMessage('Facture supprimée avec succès', 'success');
            })
            .catch(error => {
                console.error('Error deleting invoice:', error);

                showMessage('Erreur lors de la suppression de la facture');
            });
    }

    function showMessage(message, type) {
        // Créez un élément de message
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `message--${type}`);
        messageElement.textContent = message;

        // Ajoutez des styles CSS pour positionner le message en haut à gauche
        messageElement.style.position = 'absolute';
        messageElement.style.top = '20px';
        messageElement.style.left = '20px';

        // Ajoutez le message à la page
        document.body.appendChild(messageElement);

        // Supprimez le message après quelques secondes (timeout)
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }



    function markInvoiceAsPaid(invoiceId) {

        const paymentDate = new Date().toISOString().split('T')[0]; // Obtenez la date actuelle au format YYYY-MM-DD

        fetch(`http://localhost:3000/api/invoices/${invoiceId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            status: 'success',
            body: JSON.stringify({
                status: 'payée',
                paymentDate: paymentDate
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to mark invoice as paid');
                }
                // Mettez à jour les détails de la facture après la mise à jour
                singleInvoice(invoiceId);
            })
            .catch(error => {
                console.error('Error marking invoice as paid:', error);
                // Gérez l'erreur, affichez un message d'erreur, etc.
            });


    }






    // Charger les factures au chargement de la page
    loadInvoices();
    // singleInvoice(5);

});
